import {v1} from "uuid";
import {FilterValuesType, ToDoListType} from "../App";
import {
    addTodolistAC, changeTodolistFilterAC,
    ChangeTodoListFilterActionType,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', ()=> {
    let todolistId1=v1();
    let todolistId2=v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title:'What to learn', filter:'all'},
        {id: todolistId2, title:'What to buy', filter:'all'},
    ]


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should be added', ()=> {
    let todolistId1=v1();
    let todolistId2=v1();

    let newTodoListTitle = 'New Todolist';

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title:'What to learn', filter:'all'},
        {id: todolistId2, title:'What to buy', filter:'all'},
    ]

    // const endState = todolistsReducer(startState, {type: 'Add-TODOLIST', title: newTodoListTitle})

    const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))


    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe("all");

})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action=changeTodolistTitleAC(todolistId2, newTodolistTitle)
    const endState = todolistsReducer(startState, action)


    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action: ChangeTodoListFilterActionType = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[0].filter).toBe(newFilter)
})