/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Register all settings
 */


Hooks.once("ready", function() {
  // We can't set up these fields that require user selection until the "ready" hook, since users haven't been initialized yet.
  const gmUsers = game.users.filter((user : User) => user.isGM);
  const gmChoices :{[name : string]: string}= {};
  gmUsers.forEach((gmUser : User) => {
    gmChoices[gmUser.id] = gmUser.name;
  });
  game.settings.register("mg-living-world-core", "GMProxy", {
    name: game.i18n.localize("CORE.GMProxyTitle"),
    hint: game.i18n.localize("CORE.GMProxyHint"),
    scope: "world",
    config: true,
    choices: gmChoices as never,
    default: "",
    type: String
  });
});
