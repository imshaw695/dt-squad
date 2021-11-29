from breast_cancer_scratch import model_metrics_new_way,model_metrics_old_way

model_accuracy_new = []
model_accuracy_old = []
accuracy_new = []
accuracy_old = []


for run in model_metrics_old_way:
    for index,metric in enumerate(run):
        if index == 0:
            model_accuracy_old.append(metric)
        elif index == -1:
            accuracy_old.append(metric)
        else:
            continue

for run in model_metrics_new_way:
    for index,metric in enumerate(run):
        if index == 0:
            model_accuracy_new.append(metric)
        elif index == -1:
            accuracy_new.append(metric)
        else:
            continue


model_accuracy_old_mean = sum(model_accuracy_old)/len(model_accuracy_old)
accuracy_old_mean = sum(accuracy_old)/len(accuracy_old)
model_accuracy_new_mean = sum(model_accuracy_new)/len(model_accuracy_new)
accuracy_new_mean = sum(accuracy_new)/len(accuracy_new)

print(f'The mean of the model accuracy for the old method is: {model_accuracy_old_mean}')
print(f'The mean of the accuracy for the old method is: {accuracy_old_mean}')
print(f'The mean of the model accuracy for the new method is: {model_accuracy_new_mean}')
print(f'The mean of the accuracy for the new method is: {accuracy_new_mean}')
