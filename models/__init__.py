from flask.ext.sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from file import *
from thing import *
from tag import *
from appearance import *
from appearance_tag import *
from source import *
from comment import *