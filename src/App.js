//App.js

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './Components/DragDrop';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <DragDrop></DragDrop>
            </DndProvider>
        </Provider>
    );
};

export default App;
