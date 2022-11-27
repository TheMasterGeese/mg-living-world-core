import { test, expect, Page } from '@playwright/test';
import { TestEnvironment } from "./TestEnvironment"

// UIDs and other variables common throughout all tests.
/**
 * the UID for the GM user
 */
let gm_uid: string;

/**
 * Expected Values
 */
 const EXPECTED_PROXY_GM_UID : string = TestEnvironment.PROXY_GM_UID;
 const EXPECTED_GAMEMASTER_UID : string = TestEnvironment.GAMEMASTER_UID;

/**
 * Element selectors
 */
const SETTINGS_TAB = '#sidebar-tabs > a[data-tab="settings"] > .fas.fa-cogs';
const CLIENT_SETTINGS = '#client-settings';
const CONFIGURE_SETTINGS_BUTTON = '#settings-game > button[data-action="configure"]';
const GM_PROXY_SELECT = 'select[name="mg-living-world-core.GMProxy"]';
const GAMEMASTER_OPTION_SELECTED = `${GM_PROXY_SELECT} > option[value="${EXPECTED_GAMEMASTER_UID}"]:checked`;
const GM_PROXY_OPTION_SELECTED = `${GM_PROXY_SELECT} > option[value="${EXPECTED_PROXY_GM_UID}"]:checked`;

test.describe('mg-living-world-core', () => {

    test('should register settings on init', async ({ page }) => {

        await logOnAsUser(PLAYER_INDEX.GAMEMASTER, page);
        // Click the settings icon in the sidemenu
        await openModuleSettings(page);

        const gmProxyChoiceElement = await page.locator(GM_PROXY_SELECT).elementHandle();
        const gmProxyChoiceValue = await gmProxyChoiceElement.inputValue();

        // make sure the correct user is selected as a GM Proxy.
        expect(gmProxyChoiceValue).toEqual(EXPECTED_PROXY_GM_UID);
    });

    test.describe('should update GM Proxy in settings', () => {
        test('when player is GM', async ({ page }) => {
            const newGMProxy = 'Gamemaster';
            const originalGMProxy = "ProxyGM";

            await logOnAsUser(PLAYER_INDEX.GAMEMASTER, page);

            // Change the gm proxy
            await openModuleSettings(page);
            await selectGMProxyThenClose(newGMProxy, page);

            // Verify the gm proxy was changed
            await openModuleSettings(page);
            expect(await page.locator(GAMEMASTER_OPTION_SELECTED).count()).toEqual(1);

            // Revert the value of gm proxy to the default value.
            await selectGMProxyThenClose(originalGMProxy, page);
            await openModuleSettings(page);
            expect(await page.locator(GM_PROXY_OPTION_SELECTED).count()).toEqual(1);
        });
    });
    test.describe('should NOT update GM Proxy in settings', () => {
        test('when player is NOT GM', async ({ page }) => {
            await logOnAsUser(PLAYER_INDEX.PLAYER, page);
            await openModuleSettings(page);

            // Expect the field to not exist
            await expect(page.locator(GM_PROXY_SELECT)).toHaveCount(0);
        });
    });

    /**
     * Log on to Foundry as a specific user.
     * 
     * @param userIndex The index of the player to log in as.
     * @param page The test's page fixture.
     */
    async function logOnAsUser(userIndex: PLAYER_INDEX, page: Page) {
        // Go to the locally-deployed foundry instance
        await Promise.all([
            page.goto('http://localhost:30000'),
            page.waitForLoadState('load')
        ]);

        // In theory these first two should be unnecessary, but are added as a precaution.
        if (page.url() === 'http://localhost:30000/license') {
            await page.locator('#eula-agree').setChecked(true);
            await Promise.all([
                page.locator('#sign').click(),
                page.waitForLoadState('load')
            ]);
        }

        // In theory these first two should be unnecessary, but are added as a precaution.
        if (page.url() === 'http://localhost:30000/auth') {
            await page.locator('#key').fill('atropos');
            await Promise.all([
                page.locator('input[name="adminKey"]').press('Enter'),
                page.waitForLoadState('load')
            ]);
        }

        if (page.url() === 'http://localhost:30000/setup') {
            await page.locator('#setup-configuration > nav > a[data-tab="systems"]').click();
            const pf2eInstalled = await page.$('#system-list > li[data-package-id="pf2e"]');
            if (!pf2eInstalled) {
                await Promise.all([
                    page.locator('#config-tabs > div.tab.active > footer > button.install-package').click(),
                    page.waitForSelector('#install-package > section.window-content > div > div.form-group, input[name="filter"]')
                ]);
                await page.locator('#install-package > section.window-content > div > div.form-group, input[name="filter"]').fill('pathfinder second edition'),
                    await Promise.all([
                        page.keyboard.press('Enter'),
                        page.waitForSelector('button[data-manifest="https://github.com/foundryvtt/pf2e/releases/download/latest/system.json"]')
                    ]);
                await Promise.all([
                    page.locator('button[data-manifest="https://github.com/foundryvtt/pf2e/releases/download/latest/system.json"]').click(),
                    page.waitForSelector('#system-list > li[data-package-id="pf2e"]', { timeout: 120000 })
                ]);
            }
            await Promise.all([
                page.locator('#setup-configuration > nav > a[data-tab="worlds"]').click(),
                page.waitForSelector('#world-list > li[data-package-id="testWorld"] > div.package-controls > button[data-action="launchWorld"]')
            ]);
            await Promise.all([
                page.locator('#world-list > li[data-package-id="testWorld"] > div.package-controls > button[data-action="launchWorld"]').click(),
                page.waitForLoadState('load')
            ]);
        }

        // Select the user to log in as
        await page.locator('select[name="userid"]').focus();
        await page.locator('select[name="userid"]').selectOption({ index: userIndex });

        // get and then set the GM and player ids.
        // Note: The indices for the selectors are 1-based, whereas the index in the selectOption call above is 0-based.
        gm_uid = await page.locator('select[name="userid"] > option:nth-child(2)').getAttribute('value');

        // Join the game
        await Promise.all([
            page.locator('button:has-text("Join Game Session")').click({ force: true }),
            // TODO discord-integration#37: Find a way to make eslint happy about this type
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            page.waitForFunction(() => (window as any).game?.ready as boolean)
        ]);

    }

    /**
     * Opens the module settings view
     * 
     * @param page The test's page fixture.
     */
     async function openModuleSettings(page: Page) {
        await Promise.all([
            // Click the settings icon in the sidemenu
            page.locator(SETTINGS_TAB).click(),

            // Go to the "Configure settings" menu
            page.locator(CONFIGURE_SETTINGS_BUTTON).click()
        ]);
    }

    /**
     * Fills the discord webhook field then closes the module settings view. Assumes that as this function is called, you are in the
     * module settings view.
     * 
     * @param newWebhook The new webhook value.
     * @param page The test's page fixture.
     */
     async function selectGMProxyThenClose(newProxy: string, page: Page) {
        await page.locator(GM_PROXY_SELECT).selectOption({ label: newProxy });
        await Promise.all([
            page.locator('#client-settings > section > div > form > footer > button').click(),
            page.waitForSelector(CLIENT_SETTINGS, { state: 'detached' })
        ]);
    }
});

/**
 * Indicates what index each user will be in at the login screen's user selection field. Add more users as needed for your tests.
 */
enum PLAYER_INDEX {
    GAMEMASTER = 1,
    GM_PROXY = 2,
    PLAYER = 3,
}





