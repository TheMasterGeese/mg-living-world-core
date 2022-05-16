/**
 * Register all settings
 */
 Hooks.once("init", function () {

	game.settings.register("mg-living-world-core", "GM Proxy", {
		name: game.i18n.localize("CORE.GMProxyTitle"),
		hint: game.i18n.localize("CORE.GMProxyHint"),
		scope: "world",
		config: true,
		type: Number,
	});
    
});

Hooks.once("ready", function () {
    // We can't set up the choices until the "ready" hook, since users haven't been initialized yet.
    const gmProxySetting = game.settings.get("mg-living-world-core", "GM Proxy") as InexactPartial<Omit<SettingConfig<number>, "key" | "namespace">>
    const gmUsers = game.users.filter((user : User) => user.isGM);
    const gmChoices :{[name : string]: string}= {};
    for (let i = 0; i < gmUsers.length; i++) {
        gmChoices[i] = gmUsers[i].name
    }
    gmProxySetting.choices = gmChoices as never;

})
