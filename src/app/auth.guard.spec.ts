import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crear un mock para el Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter }, // Proveer el mock del Router
      ],
    });

    guard = TestBed.inject(AuthGuard); // Inyectar el guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is authenticated', () => {
    // Simular un estado autenticado
    spyOn(localStorage, 'getItem').and.returnValue('{"email": "test@example.com"}');

    const result = guard.canActivate();
    expect(result).toBeTrue(); // Permitir acceso
  });

  it('should deny activation and navigate to login if user is not authenticated', () => {
    // Simular un estado no autenticado
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate();
    expect(result).toBeFalse(); // Denegar acceso
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']); // Redirigir a login
  });
});
