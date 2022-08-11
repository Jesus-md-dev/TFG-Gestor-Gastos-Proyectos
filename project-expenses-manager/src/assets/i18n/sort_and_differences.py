import json

with open('en.json', encoding='utf-8') as f:
    data_en = json.load(f)
with open('es.json', encoding='utf-8') as f:
    data_es = json.load(f)

with open('en_backup.json', 'w', encoding='utf8') as file:
    json.dump(data_en, file, ensure_ascii=False, indent=4)
with open('es_backup.json', 'w', encoding='utf8') as file:
    json.dump(data_es, file, ensure_ascii=False, indent=4)

data_en_minus_es = list(set(data_en) - set(data_es))
data_es_minus_en = list(set(data_es) - set(data_en))

if data_en_minus_es:
    print("en - es")
    for element in data_en_minus_es:
        print("-"+element)
if data_es_minus_en:
    print("es - en")
    for element in data_es_minus_en:
        print("-"+element)

data_en_sorted = json.dumps(data_en, sort_keys=True)
with open('en.json', 'w', encoding='utf8') as file:
    json.dump(json.loads(data_en_sorted), file, ensure_ascii=False, indent=2)
data_es_sorted = json.dumps(data_es, sort_keys=True)
with open('es.json', 'w', encoding='utf8') as file:
    json.dump(json.loads(data_es_sorted), file, ensure_ascii=False, indent=2)
