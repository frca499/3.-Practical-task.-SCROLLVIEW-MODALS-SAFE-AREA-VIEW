// TASK 3 — Modals, ScrollView and SafeAreaView
// Base: my Task 2 (layout, styling, events and state) + the new features of Task 3.
import { useState } from 'react';
// TODO: add the imports you need in each step (Modal, SafeAreaView from 'react-native-safe-area-context'...)
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  TextInput,
  Modal, // STEP 1: para el modal
} from 'react-native';
// STEP 5: SafeAreaView para proteger el notch y las barras del sistema
import { SafeAreaView } from 'react-native-safe-area-context';
// colores del Task3
const COLORS = {
  primary: '#4F46E5',
  primaryLight: '#E0E7FF',
  text: '#111827',
  muted: '#6B7280',
  border: '#D1D5DB',
  offline: '#9CA3AF',
  error: '#DC2626', // BONUS: color for the error message
  card: '#FFFFFF', // nuevo: fondo de la tarjeta y del modal
  background: '#EEF1F6', // nuevo: fondo de la pantalla
};
const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. When I am not coding, I mentor junior developers, contribute to open source and explore new coffee shops around the city.';

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];
const BASE_FOLLOWERS = 1200;
const MAX_MESSAGE = 140;
// datos nuevos del Task 3
const PROJECTS = [
  { name: 'Weather App', tech: 'React Native', stars: 128 },
  { name: 'Task Tracker', tech: 'Expo', stars: 96 },
  { name: 'Photo Gallery', tech: 'Expo Camera', stars: 74 },
  { name: 'Recipe Book', tech: 'FlatList', stars: 61 },
  { name: 'Chat UI', tech: 'Flexbox', stars: 45 },
];
const CONTACTS = [
  'Ana López',
  'Ben Carter',
  'Carla Ruiz',
  'David Kim',
  'Elena Petrova',
  'Farid Hassan',
  'Grace Liu',
  'Hugo Silva',
];
// Adds thousands separators: 1200 -> '1,200'
function formatCount(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// BONUS 3: reusable Tag component
function Tag({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tag,
        selected && styles.tagSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}
export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  // BONUS 1: blocks the Follow button for 2 seconds after pressing it
  const [isBusy, setIsBusy] = useState(false);

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const isSendDisabled = message.trim().length === 0;
  // BONUS 2: derived value, true when the limit is reached
  const isMaxLength = message.length === MAX_MESSAGE;

  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // TODO STEP 1: add the state that says if the modal is visible
  const [modalVisible, setModalVisible] = useState(false);
  // TODO STEP 4: add the state for the selected contacts (an array)
  const [selectedContacts, setSelectedContacts] = useState([]);
  // true cuando no hay contactos seleccionados
  const isShareDisabled = selectedContacts.length === 0;

  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Followers', value: formatCount(followers) },
    { label: 'Following', value: '180' },
  ];
  const handleFollowPress = () => {
    if (isBusy) return;
    setIsFollowing(!isFollowing);
    // BONUS 1: disable the button for 2 seconds
    setIsBusy(true);
    setTimeout(() => setIsBusy(false), 2000);
  };
  const handleMessagePress = () => {
    setIsComposerOpen(!isComposerOpen);
  };
  // (handleSharePress se borró: ahora el botón abre el modal)
  const handleSendPress = () => {
    Alert.alert('Message sent', message);
    setMessage('');
    setIsComposerOpen(false);
  };
  // Never mutate the array: create a new one with filter / spread
  const handleSkillPress = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  // TODO STEP 2: write closeModal
  // cierra el modal y limpia los contactos seleccionados (STEP 4)
  const closeModal = () => {
    setModalVisible(false);
    setSelectedContacts([]);
  };
  // TODO STEP 4: write handleContactPress and handleConfirmShare
  // agrega o quita un contacto sin mutar el arreglo
  const handleContactPress = (name) => {
    if (selectedContacts.includes(name)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== name));
    } else {
      setSelectedContacts([...selectedContacts, name]);
    }
  };
  // muestra la alerta con los nombres y cierra el modal
  const handleConfirmShare = () => {
    Alert.alert('Profile shared', 'Sent to: ' + selectedContacts.join(', '));
    closeModal();
  };
  // TODO STEP 5: wrap the whole screen in a SafeAreaView
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.screenContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Image
            style={styles.banner}
            resizeMode="cover"
            source={require('./assets/banner.png')}
          />
          <View style={styles.body}>
            <View style={styles.headerRow}>
              <Pressable onPress={() => setIsOnline(!isOnline)}>
                <Image style={styles.avatar} source={require('./assets/avatar.png')} />
                <View style={[styles.onlineBadge, !isOnline && styles.offlineBadge]} />
              </Pressable>
              <View style={styles.headerText}>
                <Text style={styles.name}>Francisco Cardenas</Text>
                <Text style={styles.role}>Student</Text>
                <Text style={styles.location}>Jalisco, Mexico</Text>
              </View>
            </View>
            <Text style={styles.bio} numberOfLines={isBioExpanded ? undefined : 3}>
              {BIO}
            </Text>
            <Pressable onPress={() => setIsBioExpanded(!isBioExpanded)}>
              <Text style={styles.link}>
                {isBioExpanded ? 'Show less' : 'Read more'}
              </Text>
            </Pressable>
            <View style={styles.statsRow}>
              {stats.map((item, index) => (
                <View
                  key={item.label}
                  style={[styles.stat, index < stats.length - 1 && styles.statDivider]}
                >
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.tags}>
              {SKILLS.map((skill) => (
                <Tag
                  key={skill}
                  label={skill}
                  selected={selectedSkills.includes(skill)}
                  onPress={() => handleSkillPress(skill)}
                />
              ))}
            </View>
            <Text style={styles.hint}>
              Tap a skill to select it · {selectedSkills.length} selected
            </Text>
            {/* TODO STEP 3: add the 'Recent projects' horizontal ScrollView here (use PROJECTS) */}
            <Text style={styles.sectionTitle}>RECENT PROJECTS</Text>
            {/* scroll horizontal con las tarjetas de proyectos */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.projectsRow}
            >
              {PROJECTS.map((project) => (
                <View key={project.name} style={styles.projectCard}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectTech}>{project.tech}</Text>
                  <Text style={styles.projectStars}>★ {project.stars}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.actions}>
              <Pressable
                onPress={handleFollowPress}
                disabled={isBusy}
                style={({ pressed }) => [
                  styles.button,
                  isFollowing ? styles.buttonFollowing : styles.buttonPrimary,
                  isBusy && styles.buttonBusy,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={
                    isFollowing
                      ? [styles.buttonText, styles.buttonTextFollowing]
                      : styles.buttonPrimaryText
                  }
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </Pressable>
              <Pressable
                onPress={handleMessagePress}
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
              >
                <Text style={styles.buttonText}>
                  {isComposerOpen ? 'Close' : 'Message'}
                </Text>
              </Pressable>
            </View>
            {isComposerOpen && (
              <View style={styles.composer}>
                <TextInput
                  style={styles.input}
                  value={message}
                  onChangeText={(newText) => setMessage(newText)}
                  maxLength={MAX_MESSAGE}
                  placeholder="Write a message..."
                  placeholderTextColor={COLORS.muted}
                />
                {/* BONUS 2: error shown when the 140 character limit is reached */}
                {isMaxLength && (
                  <Text style={styles.errorText}>Maximum length reached</Text>
                )}
                <View style={styles.composerFooter}>
                  <Text style={styles.counter}>
                    {message.length}/{MAX_MESSAGE} characters
                  </Text>
                  <Pressable
                    onPress={handleSendPress}
                    disabled={isSendDisabled}
                    style={({ pressed }) => [
                      styles.sendButton,
                      isSendDisabled && styles.sendButtonDisabled,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.sendText}>Send</Text>
                  </Pressable>
                </View>
              </View>
            )}
            <View style={styles.shareWrapper}>
              {/* TODO STEP 1: this button must open the modal (replace the Alert) */}
              <Button
                title="Share profile"
                color={COLORS.primary}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </View>
        {/* TODO STEP 1-4: add the <Modal> here */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal} // botón atrás de Android
        >
          <View style={styles.overlay}>
            {/* tocar el fondo oscuro cierra el modal */}
            <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
            {/* la tarjeta blanca (tocar dentro no cierra) */}
            <View style={styles.sheet}>
              <Text style={styles.sheetTitle}>Share profile</Text>
              <Text style={styles.sheetText}>
                Choose who gets Francisco's profile
              </Text>
              {/* scroll vertical dentro del modal */}
              <ScrollView style={styles.contactList}>
                {CONTACTS.map((name) => {
                  const isSelected = selectedContacts.includes(name);
                  return (
                    <Pressable
                      key={name}
                      onPress={() => handleContactPress(name)}
                      style={({ pressed }) => [
                        styles.contactRow,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.contactName}>{name}</Text>
                      <View
                        style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                      >
                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
              {/* botón de compartir */}
              <Pressable
                onPress={handleConfirmShare}
                disabled={isShareDisabled}
                style={({ pressed }) => [
                  styles.shareButton,
                  isShareDisabled && styles.shareButtonDisabled,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.shareButtonText}>
                  {isShareDisabled
                    ? 'Select contacts'
                    : `Share with ${selectedContacts.length}`}
                </Text>
              </Pressable>
              {/* botón cancelar */}
              <Pressable
                onPress={closeModal}
                style={({ pressed }) => [styles.sheetClose, pressed && styles.pressed]}
              >
                <Text style={styles.sheetCloseText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // ancla del Task 2
  screen: { flex: 1, backgroundColor: COLORS.background },
  // ya no hace falta tanto paddingTop porque SafeAreaView protege la parte de arriba
  screenContent: { paddingTop: 20, paddingHorizontal: 20, paddingBottom: 40 },
  //    estilos del Task1
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  banner: {
    width: '100%',
    height: 120,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  headerText: {
    marginLeft: 14,
    paddingBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  role: {
    fontSize: 14,
    color: '#4B5563',
  },
  location: {
    fontSize: 13,
    color: '#6B7280',
  },
  bio: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    color: '#3730A3',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  buttonPrimary: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '600',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  //     estilos del Task2
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  composer: {
    marginTop: 16,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
  pressed: {
    opacity: 0.6,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  //       Estilos extras
  buttonTextFollowing: {
    color: COLORS.primary,
  },
  buttonBusy: {
    opacity: 0.4,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.error,
  },
  //       estilos del Task3
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.card,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  sheetText: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.muted,
  },
  sheetClose: {
    marginTop: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sheetCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.muted,
  },
  projectsRow: {
    gap: 12,
    paddingRight: 4,
  },
  projectCard: {
    width: 140,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
  },
  projectName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  projectTech: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
  },
  projectStars: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  contactList: {
    maxHeight: 240,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactName: {
    fontSize: 15,
    color: COLORS.text,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.offline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkMark: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  shareButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  shareButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});