const BASE_ROUTES = {
    HOME: '',
    DASHBOARD: 'dashboard',
    BLOG: 'blog',
    ABOUT: 'about',
    SURVEY: 'survey',
    LEGAL: 'legal',
}

const SURVEY_ROUTES = {
    DETAIL: (id: string) => `${BASE_ROUTES.SURVEY}/${id}`,
    CREATE: `${BASE_ROUTES.SURVEY}/create`,
}

const MORE_ROUTES = {
    FAQ: '/faq',
    DOCS: '/docs',
    CONTRIBUTING: '/contributing',
    STATUS: '/status',
    CONTACT: '/contact',
}

export const APP_ROUTES = {
    HOME: {
        LANDING: BASE_ROUTES.HOME,
    },
    DASHBOARD: {
        OVERVIEW: BASE_ROUTES.DASHBOARD,
        PREFERENCES: `${BASE_ROUTES.DASHBOARD}/preferences`,
    },
    BLOG: {
        OVERVIEW: BASE_ROUTES.BLOG,
        DETAIL: (slug: string) => `${BASE_ROUTES.BLOG}/${slug}`,
    },
    ABOUT: {
        LANDING: BASE_ROUTES.ABOUT,
    },
    SURVEY: SURVEY_ROUTES,
    MORE: MORE_ROUTES,
    LEGAL: {
        OVERVIEW: BASE_ROUTES.LEGAL,
        DETAIL: (file: string) => `${BASE_ROUTES.LEGAL}/${file}`,
        FILES: {
            PRIVACY: 'privacy',
            TERMS: 'terms',
            COOKIES: 'cookies',
            COC: 'coc',
        },
    },
}
