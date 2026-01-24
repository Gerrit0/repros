// @ts-check
/** @import * as td from "typedoc"; */

/** @type {Record<string, string | undefined>} */
const brokenLocalLinkResolutions = {
    createStore: "#",
    Watcher: "#"
};

/** @param {td.Application} app */
function resolveLinksPlugin(app) {
    app.converter.addUnknownSymbolResolver((ref, refl, part, symbol) => {
        // If TS resolved this link, don't touch it here, let typedoc still report warnings
        if (symbol) return undefined;

        if (!ref.moduleSource && ref.symbolReference?.path?.length === 1) {
            return brokenLocalLinkResolutions[ref.symbolReference.path[0].path];
        }

        return undefined;
    })
}

/** @type {td.TypeDocOptions} */
const config = {
    plugin: [resolveLinksPlugin],
    externalSymbolLinkMappings: {
        "@watchable/store": {
            "Store.write": "#",
            "Store.read": "#",
            "Watchable.watch": "#",
        }
    },
};

export default config;
