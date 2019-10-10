/** A module to load and save form parameters in query string */

/** Load settings */
const load = () => {
    try {
        const sp = new URLSearchParams(location.search);
        if (!sp.has('settings')) {
            throw new Error('No "settings" key');
        }

        const json = JSON.parse(atob(sp.get('settings')));

        return json;
    } catch (e) {
        return null;
    }
};

/**
 * Save settings
 * @param {Object} options Current option object
 */
const save = (options) => {
    const sp = new URLSearchParams();
    sp.append('settings', btoa(JSON.stringify(options)));
    history.replaceState({}, document.title, '?' + sp.toString());
    return true;
};

export { load, save };
