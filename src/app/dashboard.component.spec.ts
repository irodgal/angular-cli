import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from "./hero.service";
import { Hero } from "./hero";


describe('DashboardComponent', () => {

    let comp: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let deTitleSection: DebugElement;
    let deDiv: DebugElement;
    let elTitleSection: HTMLElement;
    let elDiv: HTMLElement;

    let heroService;
    let spyGetHeroes;
    let spyGetHero;

    const HEROES: Hero[] = [
        { id: 1, name: 'Heroe 1' },
        { id: 2, name: 'Heroe 2' },
        { id: 3, name: 'Heroe 3' },
        { id: 4, name: 'Heroe 4' },
        { id: 5, name: 'Heroe 5' },
    ];

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardComponent], // declare the test component
            imports: [RouterTestingModule],
            providers: [HeroService]
        })
            .compileComponents();  // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        comp = fixture.componentInstance;

        // UserService from the root injector
        //heroService = TestBed.get(HeroService);
        heroService = fixture.debugElement.injector.get(HeroService);

        // Setup spy on the `getQuote` method
        spyGetHeroes = spyOn(heroService, 'getHeroes')
            .and.returnValue(Promise.resolve(HEROES));

        spyGetHero = spyOn(heroService, 'getHero')
            .and.returnValue(Promise.resolve({ id: 6, name: 'Heroe 6' }));

        deTitleSection = fixture.debugElement.query(By.css('h3'));
        elTitleSection = deTitleSection.nativeElement;

        deDiv = fixture.debugElement.query(By.css('.grid-pad'));
        elDiv = deDiv.nativeElement;
    });

    /*
    it('stub object and injected HeroService should not be the same', () => {
        expect(heroServiceStub === heroService).toBe(false);

        // Changing the stub object has no effect on the injected service
        heroServiceStub.getHero = { id: 12, name: 'Mr. Nice 2' };
        expect(heroService.getHero).toEqual({ id: 11, name: 'Mr. Nice 2' });
    });
    */

    it('Titulo de la seccion: `Top Heroes`', () => {
        fixture.detectChanges();
        expect(elTitleSection.textContent).toContain('Top Heroes');
    });

    it('No se muestra nada antes de OnInit', () => {
        expect(spyGetHeroes.calls.any()).toBe(false, 'getHeroes not yet called');
        expect(spyGetHero.calls.any()).toBe(false, 'getHero not yet called');
    });

    it('No se muestra nada aunque el componente se haya inicializado (getHeroes async)', () => {
        fixture.detectChanges();
        // getHeroes service is async => still has not returned with quote
        expect(spyGetHeroes.calls.any()).toBe(true, 'getHeroes called');
    });

    it('Muestra la lista de heroes despues de la promesa getHeroes (async)', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getHeroes
            fixture.detectChanges();        // update view with heroes list
            expect(comp.heroes).toEqual(HEROES.splice(1, 5));
        });
    }));

    it('Muestra la lista de heroes despues de la promesa getHeroes (fakeAsync)', fakeAsync(() => {
        fixture.detectChanges();
        tick();                  // wait for async getHeroes
        fixture.detectChanges(); // update view with heroes list
        expect(comp.heroes).toEqual(HEROES.splice(1, 5));
    }));
});