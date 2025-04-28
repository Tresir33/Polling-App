/**
 * Fichier : SignUpPage.jsx
 * Description : Composant React pour la page d'inscription de l'application. Affiche un formulaire
 * pour enregistrer un nouvel utilisateur avec les champs requis par la table Users (Name, email,
 * gender, birth_date, phone_num, Password). Validation regex stricte sans Formik/Yup.
 */

import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 80px 20px 20px; /* Padding to account for fixed header */
`;

const FormContainer = styled.form`
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #cccccc;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #cccccc;
  }
`;

const ErrorMessage = styled.span`
  color: #ff5555;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #cccccc;
  }

  &:disabled {
    background-color: #666666;
    cursor: not-allowed;
  }
`;

/**
 * Composant : SignUpPage
 * Description : Affiche un formulaire d'inscription avec validation regex pour Name, email,
 * gender, birth_date, phone_num, et Password, conformément à la table Users.
 * Retour : JSX avec le formulaire d'inscription
 */
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    phoneNum: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Regex patterns based on MPD constraints
  const regexPatterns = {
    name: /^[a-zA-Z\s-]{1,50}$/, // Letters, spaces, hyphens, 1-50 chars
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email, max 50 chars
    phoneNum: /^\d{10}$/, // Exactly 10 digits
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/, // 8-30 chars, upper, lower, number, special
  };

  /**
   * Fonction : validateField
   * Description : Valide un champ spécifique selon les règles regex et contraintes MPD.
   * Arguments : name (nom du champ), value (valeur du champ)
   * Retour : Message d'erreur ou chaîne vide
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (!regexPatterns.name.test(value)) return 'Name must be 1-50 characters (letters, spaces, hyphens)';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (value.length > 50) return 'Email must be 50 characters or less';
        if (!regexPatterns.email.test(value)) return 'Invalid email format';
        return '';
      case 'gender':
        if (!value) return 'Gender is required';
        return '';
      case 'birthDate':
        if (!value) return 'Birth date is required';
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age -= 1; // Calculate adjusted age
        }
        if (age < 13) return 'You must be at least 13 years old';
        return '';
      case 'phoneNum':
        if (value && !regexPatterns.phoneNum.test(value)) return 'Phone number must be exactly 10 digits';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!regexPatterns.password.test(value))
          return 'Password must be 8-30 characters, with uppercase, lowercase, number, and special character';
        return '';
      default:
        return '';
    }
  };

  /**
   * Fonction : handleChange
   * Description : Met à jour l'état du formulaire et valide le champ modifié.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  /**
   * Fonction : handleSubmit
   * Description : Valide tous les champs et affiche les données du formulaire (placeholder).
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    if (Object.values(newErrors).every((error) => !error)) {
      // Placeholder: Log form data (to be replaced with backend call)
      console.log('Form Data:', {
        ...formData,
        gender: parseInt(formData.gender, 10), // Convert gender to INT
        role_admin_user: false, // Default to false
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        gender: '',
        birthDate: '',
        phoneNum: '',
        password: '',
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  // Check if form is valid to enable/disable submit button
  const isFormValid = () =>
    formData.name &&
    formData.email &&
    formData.gender &&
    formData.birthDate &&
    formData.password &&
    Object.values(errors).every((error) => !error);

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Sign Up</FormTitle>

        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            aria-label="Name"
            maxLength="50"
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            aria-label="Email"
            maxLength="50"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="gender">Gender</Label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            aria-label="Gender"
          >
            <option value="">Select gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </Select>
          {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            aria-label="Birth date"
          />
          {errors.birthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="phoneNum">Phone Number (Optional)</Label>
          <Input
            type="text"
            id="phoneNum"
            name="phoneNum"
            value={formData.phoneNum}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            aria-label="Phone number"
            maxLength="10"
          />
          {errors.phoneNum && <ErrorMessage>{errors.phoneNum}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            aria-label="Password"
            maxLength="30"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>

        <SubmitButton type="submit" disabled={!isFormValid()}>
          Sign Up
        </SubmitButton>
      </FormContainer>
    </PageContainer>
  );
};

// Exporte le composant SignUpPage pour utilisation ailleurs
export default SignUpPage;