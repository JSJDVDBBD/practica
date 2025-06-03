import { render } from '@testing-library/react-native';
import React from 'react';
import Juegos from '../src/screens/juegos';

describe("<Juegos />", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Juegos />
    );
  });

  it("Renderiza correctamente", () => {
    expect(component).toBeTruthy();
  });
});
