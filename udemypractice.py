move_types = { '3HJ0qNs8uwwIeQ': {'id': "3HJ0qNs8uwwIeQ", 'name': "sweep"},
            "-J74rec3oEhKpA": {"id": "-J74rec3oEhKpA","name": "submission"}}

d = {'poop':1, 'fart': 2}

for move_type in move_types:
    if 'submission' in move_types[move_type].values():
        print(move_type)