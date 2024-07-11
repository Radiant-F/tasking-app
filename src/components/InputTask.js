import {TextInput, TouchableOpacity, View} from 'react-native';
import Gap from './Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/stylesApp';

export default function InputTask({title, onSubmit, onChangeTitle}) {
  return (
    <View style={styles.viewInput}>
      <View style={styles.input}>
        <TextInput
          placeholder="Masukan tugas..."
          placeholderTextColor={'grey'}
          onChangeText={onChangeTitle}
          value={title}
          style={{color: 'black'}}
        />
      </View>
      <Gap width={20} />
      <TouchableOpacity
        style={styles.btnCreate}
        onPress={onSubmit}
        disabled={title == ''}>
        <Icon name={'plus-thick'} size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}
