({
	mustDeps: ['i-bem-dom'],
	shouldDeps: [
		'events',
		'heading',
		'form',
		{
			block: 'input',
			mods: { theme: 'islands', size: 'l', width: 'available', 'has-clear': true }
		},
		{
			block: 'button',
			mods: { theme: 'islands', size: 'xl', type: 'submit', view: 'action' }
		}
	]
});
