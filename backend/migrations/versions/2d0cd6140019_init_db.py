"""init db

Revision ID: 2d0cd6140019
Revises: 
Create Date: 2024-04-24 12:16:08.158393

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d0cd6140019'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('transaction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('from_account', sa.String(length=18), nullable=True),
    sa.Column('to_account', sa.String(length=18), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('currency', sa.String(length=3), nullable=True),
    sa.Column('date', sa.String(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transaction')
    # ### end Alembic commands ###
