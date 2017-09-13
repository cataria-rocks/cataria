({
	mustDeps: ['i-bem-dom'],
	shouldDeps: [
		'events',
		'heading',
		'form',
		{
			block: 'form',
			elem: 'validation-error'
		},
		{
			block: 'form',
			elem: 'control',
			mods: { required: true, type: ['url'] }
		},
		{
			block: 'input',
			mods: { theme: 'islands', size: 'l', width: 'available', 'has-clear': true, error: true },
		},
		{
			block: 'button',
			mods: { theme: 'islands', size: 'xl', type: 'submit', view: 'action' }
		}
	]
});
