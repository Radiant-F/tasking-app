import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from './components';
import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  function updateTask() {
    closeModal();
  }

  const [title, setTitle] = useState('');
  function createTask() {
    setTasks([{title: title, checked: false, id: tasks.length + 1}, ...tasks]);
    setTitle('');
  }

  return (
    <View>
      <StatusBar backgroundColor={'#330074'} />

      {/* Header */}
      <View style={styles.viewHeader}>
        <Icon name={'notebook'} size={27} color={'white'} />
        <Text style={styles.textHeader}>Tasking App</Text>
      </View>

      {/* Input Task */}
      <View style={styles.viewInput}>
        <View style={styles.input}>
          <TextInput
            placeholder="Masukan tugas..."
            placeholderTextColor={'grey'}
            onChangeText={title => setTitle(title)}
            value={title}
          />
        </View>
        <Gap width={20} />
        <TouchableOpacity
          style={styles.btnCreate}
          onPress={createTask}
          disabled={title == ''}>
          <Icon name={'plus-thick'} size={30} color={'white'} />
        </TouchableOpacity>
      </View>

      {/* Render Task */}
      <FlatList
        ListEmptyComponent={
          <Text style={{textAlign: 'center', color: 'grey'}}>
            Tidak ada tugas
          </Text>
        }
        data={tasks}
        renderItem={({item}) => {
          return (
            <View style={styles.viewTaskContainer}>
              <CheckBox
                value={item.checked}
                tintColors={{true: '#6600E7', false: '#6600E7'}}
              />
              <Gap width={20} />
              <View style={styles.viewTask}>
                <Text style={styles.textTask}>{item.title}</Text>
                <View style={styles.viewLine} />
                <View>
                  <TouchableOpacity
                    style={styles.btnOption}
                    onPress={() => setModalVisible(true)}>
                    <Icon name={'lead-pencil'} color={'white'} size={20} />
                  </TouchableOpacity>
                  <Gap height={5} />
                  <TouchableOpacity
                    style={{...styles.btnOption, backgroundColor: 'tomato'}}>
                    <Icon name={'trash-can'} color={'white'} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* Modal Edit Task */}
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="fade">
        <Pressable style={styles.backdrop} onPress={closeModal} />
        <View style={styles.modalContainer}>
          <View style={styles.viewModal}>
            <View style={styles.modalHeader}>
              <Icon name={'lead-pencil'} size={25} color={'black'} />
              <Text>Edit Tugas</Text>
              <TouchableOpacity onPress={closeModal}>
                <Icon name={'close-circle-outline'} size={25} color={'black'} />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Nama tugas..."
              placeholderTextColor={'grey'}
              style={styles.inputEdit}
            />
            <Gap height={20} />
            <TouchableNativeFeedback useForeground onPress={updateTask}>
              <View style={styles.btnEdit}>
                <Text style={styles.textEdit}>Edit</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textEdit: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  btnEdit: {
    backgroundColor: '#6600E7',
    height: 45,
    width: 100,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3,
    overflow: 'hidden',
  },
  inputEdit: {
    borderBottomWidth: 1,
    borderBottomColor: '#6600E7',
    width: '75%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    color: 'black',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewModal: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 20,
    elevation: 5,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.25,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  viewLine: {
    backgroundColor: 'black',
    width: 2,
    height: 40,
    marginHorizontal: 15,
    opacity: 0.5,
  },
  btnOption: {
    backgroundColor: '#6600E7',
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  textTask: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    flex: 1,
  },
  viewTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  viewInput: {
    flexDirection: 'row',
    margin: 20,
  },
  viewTask: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCreate: {
    width: 50,
    height: 50,
    backgroundColor: '#6600E7',
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    backgroundColor: '#ECECEC',
    height: 50,
    borderRadius: 50 / 2,
    paddingHorizontal: 20,
    elevation: 5,
    flex: 1,
  },
  textHeader: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  viewHeader: {
    flexDirection: 'row',
    backgroundColor: '#6600E7',
    height: 50,
    elevation: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
