import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ComparisonCtaComponent } from './comparison-cta.component'

describe('ComparisonCtaComponent', () => {
    let component: ComparisonCtaComponent
    let fixture: ComponentFixture<ComparisonCtaComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ComparisonCtaComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ComparisonCtaComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
