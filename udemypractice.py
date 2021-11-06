list = [1,2,3,4,5]
new_list = []
for item in list:
    if item == 1:
        new_list.append(6)
    else:
        new_list.append(item)

print(new_list)