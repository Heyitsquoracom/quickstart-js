/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { HomepageFirestore, MockHomepageFirestore } from './hompage.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { projectConfig } from 'src/environments/environment.default';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        provideFirebaseApp(() => initializeApp(projectConfig)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth())],
      declarations: [HomepageComponent],
      providers: [
        {
          provide: HomepageFirestore,
          useClass: MockHomepageFirestore
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    });
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service and get restuarants on init', () => {
    /** 
     * Tests to see that the #empty-restaurants-container div has not
     * been rendered. This div is rendered only when no restaurants have been 
     * retrieved from Firestore (or, in this case, the MockHomepageFirestore 
     * element).
     * */
    const emptyRestaurantsDiv = fixture.debugElement.query(By.css("#empty-restaurants-container"));
    expect(emptyRestaurantsDiv).toBeNull();
  });
});
