"""Add image column to games table

Revision ID: 20260107_add_image_column_to_games
Revises: 
Create Date: 2026-01-07 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20260107_add_image_column_to_games'
down_revision = None  # Set this to the previous migration's revision ID if you have one
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('games', sa.Column('image', sa.String(length=255), nullable=True))
    op.add_column('draws', sa.Column('image', sa.String(length=255), nullable=True))

def downgrade():
    op.drop_column('games', 'image')
    op.drop_column('draws', 'image')
