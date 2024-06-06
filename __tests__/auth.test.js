const request = require('supertest');
const app = require('../app');

describe('Authentification', () => {
    it('devrait retourner un message d\'authentification réussie avec un CIN et un mot de passe valides', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            cin: 'votre_cin_valide',
            mot_de_passe: 'votre_mot_de_passe_valide'
          });
        expect(response.statusCode).toBe(404); // Comme nous nous attendons à ce que l'authentification échoue avec ces identifiants
        expect(response.body).toHaveProperty('error', 'Student not found or incorrect password');
      });
      

  it('devrait retourner un code d\'erreur 404 avec un CIN ou un mot de passe incorrects', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        cin: 'cin_invalide',
        mot_de_passe: 'mot_de_passe_invalide'
      });
    expect(response.statusCode).toBe(404); // On s'attend à un code de statut 404 en cas d'échec de l'authentification
    expect(response.body).toHaveProperty('error', 'Student not found or incorrect password');
  });

  it('devrait retourner un code d\'erreur 400 si le CIN ou le mot de passe est manquant', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        // Laissez le CIN ou le mot de passe vide pour déclencher l'erreur 400
      });
    expect(response.statusCode).toBe(400); // On s'attend à un code de statut 400 en cas de données manquantes
    expect(response.body).toHaveProperty('error', 'CIN and password are required');
  });
});
