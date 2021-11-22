import secrets
import os
import json

this_directory = os.path.abspath(os.path.dirname(__file__))

def get_new_entry(name, description, move_type_id = None):
    new_entry = dict(name=name, description=description, id=secrets.token_urlsafe(10))
    if move_type_id:
        new_entry['move_type_id'] = move_type_id
    return new_entry

def get_entry_id(entry_name, entries):
    for entry_id in entries:
        entry = entries[entry_id]
        if entry_name == entry['name']:
            return entry['id']
    # No match was found
    return None

def create_data_from_scratch():
        
    grips = {}
    grip = get_new_entry("Sleeve Grip", "Grabbing sleeve on same side.")
    grips[grip['id']] = grip
    grip = get_new_entry("Pant Grip", "Grabbing pant leg on same side.")
    grips[grip['id']] = grip
    grip = get_new_entry("Cross Collar Grip", "Grab the lapel on the opposite side, thumb out.")
    grips[grip['id']] = grip
    grip = get_new_entry("Collar Grip", "Grab the lapel on the same side, thumb out.")
    grips[grip['id']] = grip

    positions = {}
    position = get_new_entry("Full Guard", "On back with legs wrapped around opponent.")
    positions[position['id']] = position
    position = get_new_entry("Half Guard", "Player on their back has one leg of their opponent entangled.")
    positions[position['id']] = position
    position = get_new_entry("Full Mount", "Dominant position past your opponents guard.")
    positions[position['id']] = position

    move_types = {}
    move_type = dict(id = secrets.token_urlsafe(10), name = "sweep")
    move_types[move_type["id"]] = move_type
    move_type = dict(id = secrets.token_urlsafe(10), name = "submission")
    move_types[move_type["id"]] = move_type
    move_type = dict(id = secrets.token_urlsafe(10), name = "escape")
    move_types[move_type["id"]] = move_type
    move_type = dict(id = secrets.token_urlsafe(10), name = "pass")
    move_types[move_type["id"]] = move_type

    moves = {}
    move_type_id = get_entry_id('submission', move_types)
    move = get_new_entry('Triangle Choke', 'One arm in one out, legs triangled around head for head and arm choke.', move_type_id)
    moves[move["id"]] = move
    move_type_id = get_entry_id('escape', move_types)
    move = get_new_entry('Upa Escape', 'Pin one arm and block their leg on the same side before bridging to knock them over.', move_type_id)
    moves[move["id"]] = move
    move_type_id = get_entry_id('pass', move_types)
    move = get_new_entry('Toerando Pass', 'Grab both pant legs, extend arms while passing to opposite side.', move_type_id)
    moves[move["id"]] = move
    move_type_id = get_entry_id('sweep', move_types)
    move = get_new_entry('Scissor Sweep', 'From guard/half-guard, leg across midsection with opposite leg blocking post', move_type_id)
    moves[move["id"]] = move

    moves_grips = {}
    move_id = get_entry_id('Triangle Choke', moves)
    grip_id = get_entry_id('Sleeve Grip', grips)
    moves_grips[f'{move_id},{grip_id}'] = dict(move_id = move_id, grip_id = grip_id)
    grip_id = get_entry_id('Pant Grip', grips)
    moves_grips[f'{move_id},{grip_id}'] = dict(move_id = move_id, grip_id = grip_id)

    moves_positions = {}
    move_id = get_entry_id('Triangle Choke', moves)
    position_id = get_entry_id('Full Guard', positions)
    moves_positions[f'{move_id},{position_id}'] = dict(move_id = move_id, position_id = position_id)

    all_data = {}
    all_data['positions'] = positions
    all_data['grips'] = grips
    all_data['moves'] = moves
    all_data['moves_positions'] = moves_positions
    all_data['moves_grips'] = moves_grips
    all_data['move_types'] = move_types

    return all_data

def put_persisted_data(data_to_be_persisted):
    path_to_data = os.path.join(this_directory, 'persisted_data.json')
    with open(path_to_data, mode="w") as file:
        file.write(json.dumps(data_to_be_persisted, indent=4))
    return 

path_to_json_file = os.path.join(this_directory, 'persisted_data.json')

if os.path.isfile(path_to_json_file):

    with open(path_to_json_file) as file:
        all_data = json.load(file)

else:
    all_data = create_data_from_scratch()
    put_persisted_data(all_data)

if __name__ == "__main__":
    print(all_data)