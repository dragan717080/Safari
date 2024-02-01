import json
import re
from firebase_admin import credentials, initialize_app, db, App
from dotenv import dotenv_values

databaseURL: str = dotenv_values("../.env")["databaseURL"]

def put_flags_to_json_file(input_file: str, out_file: str, indent: int = 4) -> dict:
    flags: list[dict[str, str]] = []

    with open(input_file, "r") as file:
        for line in file:
            line = re.split(r"\s+", line.rstrip())
            [country, [alpha, alpha2]] = " ".join(line[:-2]), line[-2:]
            d = {'country': country, 'alpha': alpha, 'alpha2': alpha2}
            flags.append(d)

    with open(out_file, "w") as out_file:
        json.dump(flags, out_file, indent=indent, ensure_ascii=False)
    return flags

def initialize_firebase() -> App:
    flags = put_flags_to_json_file("flags.txt", "flags.json")
    cred_obj = credentials.Certificate("service_account.json")
    return initialize_app(cred_obj, { "databaseURL": databaseURL })

def insert_to_collection(collection_name: str, docs) -> None:
    ref = db.reference(collection_name)
    ref.set(docs)

flags = put_flags_to_json_file("flags.txt", "flags.json")
initialize_firebase()
insert_to_collection("flags", flags)
