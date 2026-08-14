"""update hotel model

Revision ID: 666b9e1637e2
Revises: 1eac5d1ec3c1
Create Date: 2026-08-14 12:10:03.535852

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '666b9e1637e2'
down_revision = '1eac5d1ec3c1'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('hotels', schema=None) as batch_op:
        batch_op.create_unique_constraint('uq_hotels_slug', ['slug'])


def downgrade():
    with op.batch_alter_table('hotels', schema=None) as batch_op:
        batch_op.drop_constraint('uq_hotels_slug', type_='unique')
