import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BlogActivitiesComponent } from './blog-activities.component'

describe('BlogActivitiesComponent', () => {
    let component: BlogActivitiesComponent
    let fixture: ComponentFixture<BlogActivitiesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BlogActivitiesComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(BlogActivitiesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
