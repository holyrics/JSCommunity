function info() {
  return {
    id: 'example',
    name: 'Example',
    description: 'Example',
    i18n: {
        name: {
            pt: "Exemplo"
        },
        description: {
            pt: "Exemplo"
        }
    },
    settings_type: 'custom'
  };
}

function ruleSettings() {
  return [
    {
      id: 'example',
      label: 'Example',
      allowed_values: ['Item 1', 'Item 2', 'Item 3']
    }
  ];
}

function ruleTest(evt) {
  switch (evt.settings.example) {
    case 'Item 1':
      return false;

    case 'Item 2':
      return true;

    case 'Item 3':
      return false;
  }
  return false;
}