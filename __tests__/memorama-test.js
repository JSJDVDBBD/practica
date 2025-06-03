import { render } from '@testing-library/react-native';
import React from 'react';
import Memorama from '../src/screens/memorama';

describe("Memorama", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Memorama />
    );
  });

  it("Renderiza correctamente", () => {
    expect(component).toBeTruthy();
  });
});
