/* eslint-env jest */

const { mount, el } = require('redom');
const Gnal = require('../gnal').default;

const translations = {
    fr: { TO_TRANSLATE: 'ceci est une traduction' },
    en: { TO_TRANSLATE: 'this is a translation' },
};

beforeEach(() => {
    mount(
        document.body,
        el(
            'div#main',
            el('p', { i18n: 'TO_TRANSLATE' }, 'placeholder'),
        ),
    );
});

describe('update inner content', () => {
    let gnal;

    beforeEach(() => {
        gnal = new Gnal('main');
    });

    test('should update textContent', () => {
        gnal
            .translations('en', translations.en)
            .translations('fr', translations.fr)
            .choose('en')
            .translate();

        expect(document.querySelector('[i18n]').textContent).toBe(translations.en.TO_TRANSLATE);

        gnal.changeTo('fr');

        expect(document.querySelector('[i18n]').textContent).toBe(translations.fr.TO_TRANSLATE);
    });

    test('should update innerHTML', () => {
        gnal
            .translations('en', { TO_TRANSLATE: '#!><span>foobar</span>' })
            .choose('en')
            .translate();

        expect(document.querySelector('[i18n]').innerHTML).toBe('<span>foobar</span>');
    });
});

describe('update Hash', () => {
    let gnal;
    beforeEach(() => {
        gnal = new Gnal('main', { useHash: true });
        gnal
            .translations('en', translations.en)
            .translations('fr', translations.fr)
            .choose('en');
    });

    test('update location hash on translation change', () => {
        expect(window.location.hash).toBe('');
        gnal.translate();
        expect(window.location.hash).toBe('#/en');
        gnal.changeTo('fr');
        expect(window.location.hash).toBe('#/fr');
    });

    test('location hash should override prefered translation', () => {
        window.location.hash = '#/fr';
        gnal.translate();

        expect(document.querySelector('[i18n]').textContent).toBe(translations.fr.TO_TRANSLATE);
    });

    test('should not override prefered language when useHash is false', () => {
        window.location.hash = '#/fr';
        const gnalWithoutHash = new Gnal('main');
        gnalWithoutHash
            .translations('en', translations.en)
            .translations('fr', translations.fr)
            .choose('en')
            .translate();
        expect(document.querySelector('[i18n]').textContent).toBe(translations.en.TO_TRANSLATE);
    });
});
