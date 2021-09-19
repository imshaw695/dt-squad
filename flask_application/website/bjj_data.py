import os
import json

this_directory = os.path.abspath(os.path.dirname(__file__))

def create_data_from_scratch():
    move_types = {} # sweeps, submissions, escapes, passes
    sweeps = {}
    submissions = {}
    escapes = {}
    passes = {}
    move_types['sweeps'] = sweeps
    move_types['submissions'] = submissions
    move_types['escapes'] = escapes
    move_types['passes'] = passes
    positions = {}

    full_guard = {}
    full_guard['name'] = 'full_guard'
    full_guard['description'] = 'On your back with legs wrapped around opponent.'
    positions['full_guard'] = full_guard

    full_mount = {}
    full_mount['name'] = 'full_mount'
    full_mount['description'] = 'Dominant position past your opponents guard.'
    positions['full_mount'] = full_mount

    side_control = {}
    side_control['name'] = 'side_control'
    side_control['description'] = 'Dominant position past your opponents guard but to their side.'
    positions['side_control'] = side_control

    half_guard = {}
    half_guard['name'] = 'half_guard'
    half_guard['description'] = 'Player on their back has one leg of their opponent entangled.'
    positions['half_guard'] = half_guard

    x_guard = {}
    x_guard['name'] = 'x_guard'
    x_guard['description'] = 'From the bottom, the player has one leg around the opponents with the other hooked around the opposite.'
    positions['x_guard'] = x_guard

    open_guard = {}
    open_guard['name'] = 'open_guard'
    open_guard['description'] = 'Player has not had their legs passed, but does not have any legs entangled.'
    positions['open_guard'] = open_guard

    '''
    turtle = {}
    turtle['name'] = 'turtle'
    turtle['description'] = 'Player is face down with back exposed, elbows and knees pulled in.'
    positions['turtle'] = turtle
    '''

    grips = {}

    collar_grip = {}
    collar_grip['name'] = 'collar_grip'
    collar_grip['description'] = 'Grab the lapel on the same side, thumb out.'
    grips['collar_grip'] = collar_grip

    cross_collar_grip = {}
    cross_collar_grip['name'] = 'cross_collar_grip'
    cross_collar_grip['description'] = 'Grab the lapel on the opposite side, thumb out.'
    grips['cross_collar_grip'] = cross_collar_grip

    sleeve_grip = {}
    sleeve_grip['name'] = 'sleeve_grip'
    sleeve_grip['description'] = 'Grab the sleeve on the same side.'
    grips['sleeve_grip'] = sleeve_grip

    pant_grip = {}
    pant_grip['name'] = 'pant_grip'
    pant_grip['description'] = 'Grap the pant leg on the same side.'
    grips['pant_grip'] = pant_grip

    scissor_sweep = {}
    scissor_sweep['name'] = 'scissor_sweep'
    scissor_sweep['description'] = 'From guard/half-guard, leg across midsection with opposite leg blocking post'
    scissor_sweep['positions'] = []
    scissor_sweep['positions'].append('full_guard')
    scissor_sweep['positions'].append('half_guard')
    scissor_sweep['grips'] = []
    scissor_sweep['grips'].append('cross_collar_grip')
    scissor_sweep['grips'].append('sleeve_grip')
    move_types['sweeps']['scissor_sweep'] = scissor_sweep

    hip_bump = {}
    hip_bump['name'] = 'hip_bump'
    hip_bump['description'] = 'From guard, lift hips and use them to push opponent over who has posture too far back.'
    hip_bump['positions'] = []
    hip_bump['positions'].append('full_guard')
    move_types['sweeps']['hip_bump'] = hip_bump 

    pendulum_sweep = {}
    pendulum_sweep['name'] = 'pendulum_sweep'
    pendulum_sweep['description'] = 'From guard, lift hips and use them to push opponent over who has posture too far back.'
    pendulum_sweep['positions'] = []
    pendulum_sweep['positions'].append('full_guard')
    move_types['sweeps']['pendulum_sweep'] = pendulum_sweep 

    ezekiel_choke = {}
    ezekiel_choke['name'] = 'ezekiel_choke'
    ezekiel_choke['description'] = 'Using your own sleeve to submit from a variety of positions.'
    ezekiel_choke['positions'] = []
    ezekiel_choke['positions'].append('full_mount')
    ezekiel_choke['positions'].append('full_guard')
    move_types['submissions']['ezekiel_choke'] = ezekiel_choke

    cross_collar_choke = {}
    cross_collar_choke['name'] = 'cross_collar_choke'
    cross_collar_choke['description'] = 'Deep cross-collar grip then get a cross-collar on opposite trap and squeeze.'
    cross_collar_choke['positions'] = []
    cross_collar_choke['positions'].append('full_mount')
    cross_collar_choke['positions'].append('full_guard')
    cross_collar_choke['grips'] = []
    cross_collar_choke['grips'].append('cross_collar_grip')
    move_types['submissions']['cross_collar_choke'] = cross_collar_choke

    upa_escape = {}
    upa_escape['name'] = 'upa_escape'
    upa_escape['description'] = 'Pin one arm and block their leg on the same side before bridging to knock them over.'
    upa_escape['positions'] = []
    upa_escape['positions'].append('full_mount')
    move_types['escapes']['upa_escape'] = upa_escape

    sliding_hip_escape = {}
    sliding_hip_escape['name'] = 'sliding_hip_escape'
    sliding_hip_escape['description'] = 'With both arms, frame against opponents hips, get up on elbow, and shrimp to create space to establish guard.'
    sliding_hip_escape['positions'] = []
    sliding_hip_escape['positions'].append('full_mount')
    move_types['escapes']['sliding_hip_escape'] = sliding_hip_escape

    toreando_pass = {}
    toreando_pass['name'] = 'toreando_pass'
    toreando_pass['description'] = 'Grab both pant legs, extend arms while passing to opposite side.'
    toreando_pass['positions'] = []
    toreando_pass['positions'].append('open_guard')
    move_types['passes']['toreando_pass'] = toreando_pass

    all_data = {}

    all_data['positions'] = positions
    all_data['move_types'] = move_types
    all_data['grips'] = grips

    return all_data

def put_persisted_data(data_to_be_persisted):
    path_to_data = os.path.join(this_directory, 'persisted_data.json')
    with open(path_to_data, mode="w") as file:
        file.write(json.dumps(data_to_be_persisted, indent=4))
    return 


all_data = create_data_from_scratch()

positions = all_data['positions']
move_types = all_data['move_types']
grips = all_data['grips']

if __name__ == '__main__':

    if os.path.isfile('persisted_data.json'):

        with open('persisted_data.json') as f:
            data = json.load(f)

    else:
        put_persisted_data(all_data)

    # Try to do again 2 and put it into a card
    # move_types['sweeps']['scissor_sweep'] 
    print()
    print()
    print()
    print()
    print()
    # for sweep_name in move_types['sweeps']:
    sweep_name = 'scissor_sweep'
    sweep = move_types['sweeps'][sweep_name]
    sweep_positions = sweep['positions']
    for position_name in sweep_positions:
        position = positions[position_name]
        description = position['description']
        print(f'{sweep_name} {sweep["description"]} {position_name} {position["description"]} {sweep["grips"]}')