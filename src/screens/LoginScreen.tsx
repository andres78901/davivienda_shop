/**
 * Pantalla de inicio de sesión (DummyJSON auth/login).
 */

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './style/LoginScreen.styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import type { AuthStackParamList } from '../navigation/style/types';
import { login } from '../services/authApi';
import { setCredentials, setLoading, setError } from '../store/authSlice';
import { setStoredAuth } from '../store/authStorage';
import type { RootState } from '../store';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((s: RootState) => s.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();
    if (!trimmedUser || !trimmedPass) {
      dispatch(setError('Usuario y contraseña son obligatorios'));
      return;
    }
    dispatch(setError(null));
    dispatch(setLoading(true));
    try {
      const res = await login({ username: trimmedUser, password: trimmedPass });
      const { accessToken, refreshToken: _ref, ...user } = res;
      dispatch(setCredentials({ user, accessToken }));
      await setStoredAuth(user, accessToken);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Error al iniciar sesión';
      dispatch(setError(message));
      Alert.alert('Error', message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.hint}>
          Usa usuarios de DummyJSON (ej: emilys / emilyspass)
        </Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
          disabled={isLoading}
        >
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
