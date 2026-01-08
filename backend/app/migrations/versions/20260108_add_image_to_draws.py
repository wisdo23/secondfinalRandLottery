"""
Revision ID: 20260108_add_image_to_draws
Revises: 20260107_add_image_column_to_games
Create Date: 2026-01-08
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('draws', sa.Column('image', sa.String(length=255), nullable=True))

def downgrade():
    op.drop_column('draws', 'image')
