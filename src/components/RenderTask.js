import CheckBox from '@react-native-community/checkbox';
import {Text, TouchableOpacity, View} from 'react-native';
import Gap from './Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/stylesApp';

export default function RenderTask({
  task,
  onPressEdit,
  onChecklist,
  onPressDelete,
}) {
  return (
    <View style={styles.viewTaskContainer}>
      <CheckBox
        value={task.checked}
        tintColors={{true: '#6600E7', false: '#6600E7'}}
        onValueChange={onChecklist}
      />
      <Gap width={20} />
      <View style={styles.viewTask}>
        <Text style={styles.textTask}>{task.title}</Text>
        <View style={styles.viewLine} />
        <View>
          <TouchableOpacity style={styles.btnOption} onPress={onPressEdit}>
            <Icon name={'lead-pencil'} color={'white'} size={20} />
          </TouchableOpacity>
          <Gap height={5} />
          <TouchableOpacity
            style={{...styles.btnOption, backgroundColor: 'tomato'}}
            onPress={onPressDelete}>
            <Icon name={'trash-can'} color={'white'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
