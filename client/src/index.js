import { app } from 'hyperapp';
import { Router } from "@hyperapp/router"
import actions from './actions';
import state from './state';
import view from './views';
import events from './events';

app({ 
    state, 
    actions, 
    view, 
    mixins: [Router], 
    events 
});
