/**
 * Fichier : Header.jsx
 * Description : Composant React pour l'en-tête de l'application. Affiche une barre de navigation
 * avec des liens pour la page d'accueil et l'inscription.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #000000;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const HeaderNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    text-decoration: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #cccccc;
  }
`;

/**
 * Composant : Header
 * Description : Affiche l'en-tête avec une barre de navigation contenant des liens vers
 * la page d'accueil et la page d'inscription.
 * Retour : JSX avec la barre de navigation
 */
const Header = () => {
  return (
    <HeaderContainer>
      <HeaderNavbar>
        <ul>
          <li>
            <StyledLink to="/" aria-label="Aller à l'accueil">
              Home
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/signup" aria-label="Aller à la page d'inscription">
              Sign Up
            </StyledLink>
          </li>
        </ul>
      </HeaderNavbar>
    </HeaderContainer>
  );
};

// Exporte le composant Header pour utilisation ailleurs
export default Header;