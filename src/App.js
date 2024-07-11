import {View, Text, StatusBar, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, InputTask, ModalEditTask, RenderTask} from './components';
import {useState} from 'react';
import {styles} from './styles/stylesApp';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  function createTask() {
    setTasks([{title: title, checked: false, id: tasks.length + 1}, ...tasks]);
    setTitle('');
  }

  function deleteTask(id) {
    Alert.alert(
      'Hapus tugas?',
      'Tindakan ini tidak bisa diulang.',
      [
        {
          text: 'Hapus',
          onPress: () => setTasks(tasks.filter(task => task.id != id)),
        },
        {text: 'Batal'},
      ],
      {cancelable: true},
    );
  }

  function checklistTask(id) {
    setTasks(
      tasks.map(task =>
        task.id == id ? {...task, checked: !task.checked} : task,
      ),
    );
  }

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const [editedTask, setEditedTask] = useState({
    title: '',
    checked: false,
    id: 0,
  });
  function updateTask() {
    setTasks(tasks.map(task => (task.id == editedTask.id ? editedTask : task)));
    setModalVisible(false);
  }

  return (
    <View>
      <StatusBar backgroundColor={'#330074'} />

      {/* Header */}
      <View style={styles.viewHeader}>
        <Icon name={'notebook'} size={27} color={'white'} />
        <Text style={styles.textHeader}>Tasking App</Text>
      </View>

      <View style={styles.container}>
        {/* Input Task */}
        <InputTask
          title={title}
          onSubmit={createTask}
          onChangeTitle={title => setTitle(title)}
        />

        {/* Render Task */}
        <FlatList
          ListFooterComponent={<Gap height={290} />}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', color: 'grey'}}>
              Tidak ada tugas
            </Text>
          }
          data={tasks}
          renderItem={({item: task}) => {
            return (
              <RenderTask
                task={task}
                onChecklist={() => checklistTask(task.id)}
                onPressDelete={() => deleteTask(task.id)}
                onPressEdit={() => {
                  setModalVisible(true);
                  setEditedTask(task);
                }}
              />
            );
          }}
        />
      </View>

      {/* Modal Edit Task */}
      <ModalEditTask
        visible={modalVisible}
        valueInput={editedTask.title}
        onChangeTitle={title => setEditedTask({...editedTask, title: title})}
        onRequestClose={closeModal}
        onSubmit={updateTask}
      />
    </View>
  );
}
