from main import db

# consider many-to-many relationships
 
champion_item_table = db.Table('champion_item',
     db.Column('champion_id', db.Integer, db.ForeignKey('champion.id')),
     db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
)

role_item_table = db.Table('role_item',
     db.Column('role_id', db.Integer, db.ForeignKey('role.id')),
     db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
)

# models

class Champion (db.Model):
    name = db.Column(db.String(20), primary_key=True)
    lore = db.Column(db.String(4400))
    img_url = db.Column(db.String(20))

    roles = db.Column(db.Integer, db.ForeignKey('role.id'))
    classes = db.Column(db.Integer, db.ForeignKey('class.id')) # csv
    items = db.relationship(
        'Item',
        secondary=champion_item_table,
        backref='champions'
    )

    def __init__(self, name, roles, classes, items, lore, img_url):
        self.name = name
        self.roles = roles
        self.classes = classes
        self.items = items
        self.lore = lore
        self.img_url = img_url

    def __repr__(self):
        return '<Champion %s>' % self.name

class Item (db.Model):
    name = db.Column(db.String(30), primary_key=True)
    categories = db.Column(db.String(100))
    img_url = db.Column(db.String(40))

    # champions: refer to backref
    roles = db.relationship(
        'Role',
        secondary=role_item_table,
        backref='items'
    )

    def __init__(self, name, categories, roles, img_url):
        self.name = name
        self.champions = champions
        self.categories = categories
        self.roles = roles
        self.img_url = img_url

    def __repr__(self):
        return '<Item %s>' % self.name

class Class (db.Model):
    name = db.Column(db.String(40), primary_key=True)
    img_url = db.Column(db.String(20))
    description = db.Column(db.String(100))

    champions = db.relationship('Champion', backref='class')
    items = db.relationship(
        'Item',
        secondary=champion_item_table,
        backref='classes'
    )

    def __init__(self, name, champions, description, items, img_url):
        self.name = name
        self.champions = champions
        self.description = description
        self.items = items
        self.img_url = img_url

    def __repr__(self):
        return '<Class %s>' % self.name

class Role (db.Model):
    name = db.Column(db.String(20), primary_key=True)
    img_url = db.Column(db.String(10))

    classes = db.Column(db.String(100))
    # items: refer to backref
    champions = db.relationship('Champion', backref='role')


    def __init__(self, name, champions, classes, img_url):
        self.name = name
        self.champions = champions
        self.classes = classes
        self.img_url = img_url

    def __repr__(self):
        return '<Role %s>' % self.name

def db_create_tables():
    db.create_all()
    print("Created tables")
