import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from './Gap';
import {styles} from '../styles/stylesApp';

export default function ModalEditTask({
  visible,
  onRequestClose,
  valueInput,
  onChangeTitle,
  onSubmit,
}) {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade">
      <Pressable style={styles.backdrop} onPress={onRequestClose} />
      <View style={styles.modalContainer}>
        <View style={styles.viewModal}>
          <View style={styles.modalHeader}>
            <Icon name={'lead-pencil'} size={25} color={'black'} />
            <Text style={{color: 'black'}}>Edit Tugas</Text>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon name={'close-circle-outline'} size={25} color={'black'} />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Nama tugas..."
            placeholderTextColor={'grey'}
            style={styles.inputEdit}
            value={valueInput}
            onChangeText={onChangeTitle}
          />
          <Gap height={20} />
          <TouchableNativeFeedback
            useForeground
            onPress={onSubmit}
            disabled={valueInput == ''}>
            <View style={styles.btnEdit}>
              <Text style={styles.textEdit}>Edit</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </Modal>
  );
}
