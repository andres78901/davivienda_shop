/**
 * Pantalla de datos del usuario autenticado (solo lectura).
 */

import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useThemeColors } from '../hooks/useThemeColors';
import { useTranslation } from '../hooks/useTranslation';
import { styles } from './style/ProfileScreen.styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/style/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

function FieldRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string | number | undefined | null;
  isLast?: boolean;
}) {
  const display = value != null && value !== '' ? String(value) : null;
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={2}>
        {display ?? <Text style={styles.empty}>—</Text>}
      </Text>
    </View>
  );
}

export function ProfileScreen(_props: Props) {
  const { primary } = useThemeColors();
  const { t } = useTranslation();
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.scrollContent}>
          <Text style={styles.empty}>{t('noUserData')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {user.image ? (
          <Image
            source={{ uri: user.image }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : null}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: primary }]}>{t('personalData')}</Text>
          <FieldRow label={t('fieldId')} value={user.id} />
          <FieldRow label={t('fieldUsername')} value={user.username} />
          <FieldRow label={t('fieldEmail')} value={user.email} />
          <FieldRow label={t('fieldFirstName')} value={user.firstName} />
          <FieldRow label={t('fieldLastName')} value={user.lastName} />
          <FieldRow label={t('fieldGender')} value={user.gender} isLast />
        </View>
      </ScrollView>
    </View>
  );
}
