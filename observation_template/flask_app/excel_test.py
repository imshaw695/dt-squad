from openpyxl import load_workbook

book = load_workbook('testbook.xlsx')
sheet = book.active
new_data = [3,5,6,2]

for row in sheet['b2':'d2']:
    for index, cell in enumerate(row):
        cell.value = new_data[index]

book.save('testbook.xlsx')