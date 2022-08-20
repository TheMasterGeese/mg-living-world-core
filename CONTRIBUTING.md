# CONTRIBUTING.md

This module is part of the MG Living World module collection. Setup instructions and other guidance that applies to all modules in this collection can be found [here](https://github.com/TheMasterGeese/MasterGeeseLivingWorldTools/blob/%236-github_workflows/CONTRIBUTING.md)

## Setup

* Clone the repo into a local folder in your dev environment ```git clone https://github.com/TheMasterGeese/mg-block-initiative main```

* Follow the setup instruction [here](https://github.com/TheMasterGeese/MasterGeeseLivingWorldTools/blob/%236-github_workflows/CONTRIBUTING.md) which apply to all MG Living World modules.

* Add the following variables to your .env file, which will be required while running the test gulp task.
``` 
    DOCKER_CONTAINER = "mg-living-world-core-foundry-1"
```
* Add the following variables to your tests/TestEnvironment file, which will be required while running npx playwright test (and the test gulp task)
``` 
    public static PROXY_GM_UID = "WDduunF8JMaxNoP3";
    public static GAMEMASTER_UID = "iF8XB8q033MxJkU3";
```

