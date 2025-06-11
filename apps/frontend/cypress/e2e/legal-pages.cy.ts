describe('Footer Legal Links', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    const legalLinks = [
        {
            label: 'Privacy',
            url: '/legal/privacy',
            expectText:
                'This Privacy Policy applies to the personal Chorizo website',
        },
        {
            label: 'Terms',
            url: '/legal/terms',
            expectText: 'These terms govern your use of the personal website',
        },
        {
            label: 'Cookies',
            url: '/legal/cookies',
            expectText: 'This document outlines the Cookie Policy',
        },
        {
            label: 'Code of Conduct',
            url: '/legal/coc',
            expectText: 'Code of Conduct',
        },
    ]

    legalLinks.forEach((link) => {
        it(`should show the ${link.label} page and render markdown`, () => {
            cy.contains(link.label).click()
            cy.url().should('include', link.url)

            cy.get('app-legal-markdown-renderer', { timeout: 10000 }).should(
                'exist'
            )

            cy.get('.markdown-content', { timeout: 10000 })
                .should('exist')
                .should('contain.text', link.expectText)
        })
    })
})
