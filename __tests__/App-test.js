import React from 'react'
import { render } from '@testing-library/react-native'
import App from '../App'

describe('App Component', () => {
    let component;

    beforeEach(() => {
        component = render(
            <App />
        );
    });

    it("Renderiza correctamente", () => {
        expect(component).toBeTruthy();
    });
})
