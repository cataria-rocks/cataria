({
	shouldDeps: [
		'heading',
		'user',
		'form',
		{
			block: 'input',
			mods: { theme: 'islands', size: 'm', width: 'available', 'has-clear': true }
		},
		{
			block: 'button',
			mods: { theme: 'islands', size: 'm', type: 'submit', view: 'action' }
		}
	]
});
