/**
 * This library is a low-impact, no dependency i18n helper.
 * It provides tools to easily translate sites, with a simple JSON
 * object.
 * It also provides elements to display a hash indicating the translation
 * and helping people to share a translation-aware URL.
 */
class Gnal {
    /**
     * Example
     *
     * ```js
     * const gnal = new Gnal({ useHash: true });
     * gnal
     *  .translations('en', { GREETINGS: 'hello' })
     *  .translations('fr', { GREETINGS: 'bonjour' })
     *  .translations('es', { GREETINGS: 'holà' })
     *  .translations('it', { GREETINGS: 'ciao' })
     *  .translations('hu', { GREETINGS: 'szia' })
     *  .choose('en')
     *  .translate();
     *
     * document.querySelector('#btn-es').onclick =
     *      e => gnal.changeTo('es');
     * ```
     * @param {string} [mainContainer] optional container element where
     * the translation takes place
     * @param {Object} options some configuration options
     * @param {boolean} options.useHash if it must use the hash or not.
     */
    constructor(_mainContainer, _options) {
        let mainContainer = _mainContainer;
        let options = _options;
        if (typeof mainContainer === 'object') {
            options = mainContainer;
            mainContainer = undefined;
        }
        options = options || {};
        this.container = mainContainer
            ? document.querySelector(`#${mainContainer}`)
            : document.querySelector('body');
        this.useHash = options.useHash || false;

        if (this.useHash) {
            this.preferredLanguage =
                window.location.hash
                    .replace('#', '')
                    .replace('/', '');
        }
    }
    /**
     * Register new key values for `idx` language.
     * Each key in the `object` must exist in all
     * the registered objects (which is not checked)
     * if you want to include HTML in your text start
     * it with `#!>`
     * @param {string} idx the index/language ISO code used as language selector
     * @param {Object} object The unique key by phrase
     * @return this to chain methods
     */
    translations(idx, object) {
        this.translations[idx] = object;
        return this;
    }
    /**
     * specify a key from the registered objects as displayed language
     * is used as fallback language is useHash and hash is not valid
     * @throws {Error} if the key does not exists
     * @param {string} idx the key to choose as language
     * @return this to chain methods
     */
    choose(idx) {
        const hasCurrentProperty = Object.prototype.hasOwnProperty.call(this.translations, idx);
        const hasCurrentLangage =
            Object.prototype.hasOwnProperty.call(this.translations, this.preferredLanguage);

        if (!hasCurrentProperty) {
            // eslint-disable-next-line
            console.error('You must choose one of ' +
                Object.keys(this.translations));
        }
        if (this.useHash && hasCurrentLangage) {
            return this;
        }

        this.preferredLanguage = idx;
        return this;
    }
    /**
     * starts the translation process -> looking for every `[i18n]`
     * elements inside the container Element
     * @throws {Error} if translations or choose haven't been called
     */
    translate() {
        if (!this.preferredLanguage) {
            throw Error('please choose a language to display, see #choose()');
        }
        if (!this.translations) {
            throw Error('please register translations, see #translations()');
        }

        const translation = this.translations[this.preferredLanguage];
        const elements = this.container.querySelectorAll('[i18n]');
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            const content = translation[el.getAttribute('i18n')].trim();
            if (content.slice(0, 3) === '#!>') {
                el.innerHTML = content.slice(3).trim();
            } else {
                el.textContent = content;
            }
        }

        if (this.useHash) this.updateHash();
    }
    /**
     * change the displayed language for a new one. the behaviour is to change
     * the language and call translate
     * @param {string} idx the new language to display
     */
    changeTo(idx) {
        const hasCurrentProperty = Object.prototype.hasOwnProperty.call(this.translations, idx);
        if (!hasCurrentProperty) {
            // eslint-disable-next-line
            throw new Error('You can\'t change to a non existant language, use one of ' +
                Object.keys(this.translations));
        }

        if (this.preferredLanguage === idx) return;

        this.preferredLanguage = idx;
        this.translate();
    }
    /**
     * Change the hash by appending the current lang code to the URL
     */
    updateHash() {
        window.location.hash = `#/${this.preferredLanguage}`;
    }
}

export default Gnal;
