import sys
import json
import os
from datetime import datetime
from notion.client import NotionClient
from notion.collection import NotionDate

PUBLISHED = 'published'


def get_build_log():
    filepath = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '../notion-build-log.json'))
    print(f'reading path {filepath}')
    with open(filepath, mode='r', encoding='utf-8') as f:
        obj = json.load(f)

    return obj


def get_client():
    try:
        token = os.environ['NOTION_TOKEN_V2']
    except Exception as err:

        print('Need a client')
        return

    return NotionClient(token_v2=token)


def main():
    args = sys.argv[1:]
    dry_run = '--dry-run' in args

    client = get_client()
    build_log = get_build_log()
    view_url = build_log['config']['databaseViewUrl']
    # Must strip trailing Z from ISO format for it to work with Py
    iso_datetime = build_log["buildDate"].replace('Z', '')
    staged_node_ids = [x['_notionBlockId'] for x in build_log['stagedNodes']]

    for id in staged_node_ids:
        block = client.get_block(id)
        notion_date = NotionDate(start=datetime.fromisoformat(iso_datetime))

        if dry_run:
            print(f'[BLOCK {block.id} {block.title}]')
            print(f'\tstatus: {block.status} -> {PUBLISHED}')
            print(
                f'\tpublished: {block.published} -> {str(notion_date.start)}')
            continue

        block.status = PUBLISHED
        block.published = notion_date

    print("Done!")


if __name__ == "__main__":
    main()