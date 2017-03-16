import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ], // declare the test component
            imports: [ RouterTestingModule ]
        })
        .compileComponents();  // compile template and css
    }));    

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);      

        comp = fixture.componentInstance; // AppComponent test instance

        // query for the title <h1> (Title) by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('Sin titulo en el DOM hasta llamar manualmente a `detectChanges`', () => {
        expect(el.textContent).toEqual('');
    });

    it('Muestra el titulo original', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });

    it('Muestra un título diferente `Test title`', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });
}); 