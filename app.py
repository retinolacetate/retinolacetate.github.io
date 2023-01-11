from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)  # creates main application as an instance of Flask class
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///my.db"  # initializes a DB in current location
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # allows to skip tracking insignificant records


@app.route('/')
def main_page():
    login = "login"
    return render_template('index.html', login=login)


db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(50))

    def __init__(self, login, password):
        self.login = login
        self.password = password

    def __repr__(self):
        return f'user {self.login}'

    def create(self):
        user = User(login=self.login, password=self.password)
        db.session.add(user)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def change(self, new_login, new_password):
        user = User.query.filter_by(login=self.login).first()
        user.login = new_login
        user.password = new_password
        db.session.commit()


class Visitor(User):
    email = db.Column(db.String(50))
    age = db.Column(db.Integer)

    def __init__(self, email, age, login, password):
        super().__init__(login, password)
        self.email = email
        self.age = age

    def change_theme(self):
        pass


class Admin(User):
    owner = db.Column(db.Boolean)
    can_edit = db.Column(db.Boolean)

    def __init__(self, login, password, can_edit=True, owner=False, ):
        super().__init__(login, password)
        self.owner = owner
        self.can_edit = can_edit

    def assign(self):
        self.can_edit = True


class Mural(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(5000), nullable=False)

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return f'mural {self.name}'

    def add(self):
        mural = Mural(name=self.name, description=self.description)
        db.session.add(mural)
        db.session.commit()

    def remove(self):
        db.session.delete(self)
        db.session.commit()

    def edit(self, new_name, new_description):
        mural = Mural.query.filter_by(name=self.name).first()
        mural.name = new_name
        mural.description = new_description
        db.session.commit()


@app.route("/admin", methods=("POST", "GET"))
def admin():
    if request.method == "POST":
        try:
            name = request.form['name']
            description = request.form['description']
            mural_old = Mural.query.filter_by(name=name).first()
            mural_new = Mural(name=name, description=description)

            if mural_old is not None:
                if description == "del":
                    mural_old.remove()
                else:
                    mural_old.edit(new_name=name, new_description=description)
            else:
                mural_new.add()

        except:
            db.session.rollback()
            print("Database adding Error")

    return render_template('admin.html')


@app.route("/login", methods=("POST", "GET"))
def sign_in():
    if request.method == "POST":
        login = request.form['login']
        password = request.form['password']
        user = db.session.query(User).filter_by(login=login).first()

        if login == 'admin' and password == "secret":
            return redirect("/admin")

        if user is not None:
            if user.password == password:
                return render_template("index.html", login=login)
        else:
            print("Does not exist")
            return redirect('/signup')

    return render_template('login.html')


@app.route("/signup", methods=("POST", "GET"))
def sign_up():
    if request.method == "POST":
        login = request.form["login"]
        email = request.form["email"]
        age = request.form["age"]
        password1 = request.form["password1"]
        password2 = request.form["password2"]

        if User.query.filter_by(login=login).first() is None and password1 == password2:
            user = Visitor(login=login, email=email, age=age, password=password1)
            db.session.add(user)
            db.session.commit()
            return redirect("/login")

    return render_template('signup.html')


# Murals
@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/bluebird")
def bluebird():
    return render_template("bluebird.html")


@app.route("/deer")
def deer():
    return render_template("deer.html")


@app.route("/kpi")
def kpi():
    return render_template("kpi.html")


@app.route("/labyrinth")
def labyrinth():
    return render_template("labyrinth.html")


@app.route("/planes")
def planes():
    return render_template("planes.html")


@app.route("/rabbit")
def rabbit():
    return render_template("rabbit.html")


@app.route("/rebirth")
def rebirth():
    return render_template("rebirth.html")


@app.route("/sea")
def sea():
    return render_template("sea.html")


@app.route("/selfmademan")
def selfmademan():
    return render_template("selfmademan.html")


@app.route("/ukbird")
def ukbird():
    return render_template("ukbird.html")


@app.route("/waterfall")
def waterfall():
    return render_template("waterfall.html")


@app.route("/yellbird")
def yellbird():
    return render_template("yellbird.html")


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
