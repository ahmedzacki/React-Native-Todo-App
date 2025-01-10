import React from "react";
import { Text, View, StyleSheet, ScrollView, TextInput, Button, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
// import the data list from the data/todos.js file
import { data } from '@/data/todos.js';


// I am going to create a simple CRUD app using React Native and Expo.
// I will use the following technologies:
// - React Native
// - Expo
// - React Navigation
// - React Native Elements


export default function Index() {

  const [text, onChangeText] = React.useState('');

  const Separator = () => <View style={styles.separator} />;

  const [todos, setTodos] = React.useState(data);

  const addTodo = (title) => {
    setTodos([...todos, { id: todos.length + 1, title: title, completed: false }]);
    onChangeText('');
  };

  const removeTodo = (id) => {
    // instead of deleting the todo, I am going to set the completed property to true
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: true } : todo));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Add a new todo"
            placeholderTextColor="#666"
          />
          <View style={styles.addButton}>
            <Button
              title="Add"
              onPress={() => addTodo(text)}
              color="#000"
            />
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <FlatList
            data={todos}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.todoItem}>
                <Text style={item.completed ? styles.todoCompleted : styles.todoText}>
                  {item.title}
                </Text>
                <Icon 
                  name="trash" 
                  size={20} 
                  color="#ff4444"
                  style={styles.deleteIcon}
                  onPress={() => removeTodo(item.id)} 
                />
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    backgroundColor: '#111',
  },
  body: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  todoText: {
    color: '#fff',
    fontSize: 16,
  },
  todoCompleted: {
    color: '#666',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
  },
  deleteIcon: {
    padding: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderRadius: 20,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
