const BASE_ROUTES = {
    HOME: '',
    DASHBOARD: 'dashboard',
    BLOG: 'blog',
    ABOUT: 'about',
    SURVEY: 'survey',
    LEGAL: 'legal',
}

const SURVEY_ROUTES = {
    OVERVIEW: BASE_ROUTES.SURVEY,
    CREATE: `${BASE_ROUTES.SURVEY}/create`,
    VOTE: (id: string, isLink: boolean = false) =>
        `${isLink ? BASE_ROUTES.SURVEY + '/' : ''}${id}/vote`,
    DETAIL: (id: string, isLink: boolean = false) =>
        `${isLink ? BASE_ROUTES.SURVEY + '/' : ''}${id}`,
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
        DETAIL: (slug: string) => `/${BASE_ROUTES.BLOG}/${slug}`,
        TAG: (tag: string) => `/${BASE_ROUTES.BLOG}?t=${tag}`,
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
